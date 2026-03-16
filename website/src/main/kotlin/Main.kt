package dev.luisramos.website

import dev.luisramos.website.pages.AboutPage
import dev.luisramos.website.pages.BlogPage
import dev.luisramos.website.pages.CVPage
import dev.luisramos.website.pages.GamesPage
import dev.luisramos.website.pages.IndexPage
import dev.luisramos.website.pages.NotFoundPage
import dev.luisramos.website.rss.RssGenerator
import dev.luisramos.website.rss.RssItem
import dev.luisramos.website.templates.PostTemplate
import org.commonmark.parser.Parser
import org.commonmark.renderer.html.HtmlRenderer
import org.yaml.snakeyaml.Yaml
import java.nio.file.Files
import java.nio.file.Path
import java.util.Date
import kotlin.io.path.copyTo
import kotlin.io.path.listDirectoryEntries

fun main(vararg args: String) {
    val outDir = Path.of("build/site")
    Files.createDirectories(outDir)

    val posts = loadPosts(Path.of("build/resources/main/content"))
        .filter { "drafts" in args || !it.frontMatter.isDraft }
    posts.forEach { post ->
        val postDir = outDir.resolve(post.frontMatter.slug.removePrefix("/"))
        Files.createDirectories(postDir)

        val html = PostTemplate(post)
        Files.writeString(postDir.resolve("index.html"), html)

        post.images.forEach { imagePath ->
            imagePath.copyTo(postDir.resolve(imagePath.fileName), overwrite = true)
        }
    }

    listOf(
        "/" to IndexPage(posts),
        "/blog" to BlogPage(posts),
        "/about" to AboutPage(),
        "/cv" to CVPage(),
        "/games" to GamesPage(),
        "/not_found" to NotFoundPage()
    ).forEach { (url, html) ->
        val pageDir = outDir.resolve(url.removePrefix("/"))
        Files.createDirectories(pageDir)
        Files.writeString(pageDir.resolve("index.html"), html)
    }

    RssGenerator.generate(
        siteTitle = SiteMetadata.Title,
        siteUrl = SiteMetadata.SiteUrl,
        siteDescription = SiteMetadata.Description,
        items = posts.map { post ->
            RssItem(
                title = post.frontMatter.title,
                slug = post.frontMatter.slug,
                date = post.frontMatter.date,
                description = post.frontMatter.description
            )
        },
        outPath = outDir.resolve("rss.xml")
    )
}

data class FrontMatter(
    val title: String,
    val date: Date,
    val description: String?,
    val slug: String,
    val tags: List<String>,
    val isDraft: Boolean,
    val imageUrl: String?
)

data class PostContent(
    val frontMatter: FrontMatter,
    val images: List<Path>,
    val htmlBody: String
)

@Suppress("UNCHECKED_CAST")
fun loadPosts(contentRoot: Path): List<PostContent> {
    val parser = Parser.builder().build()
    val renderer = HtmlRenderer.builder().build()
    val yaml = Yaml()

    if (!Files.exists(contentRoot)) return emptyList()

    return contentRoot.listDirectoryEntries().map { dir ->
        val mdPath = dir.resolve("index.md")
        val raw = Files.readString(mdPath)

        val (frontMatter, body) = splitFrontMatter(raw)

        val frontMatterMap = yaml.load<Map<String, Any?>>(frontMatter)

        val slug = (frontMatterMap["slug"] as String).trim()
        val title = (frontMatterMap["title"] as String).trim()
        val date = (frontMatterMap["date"] as Date)
        val description = (frontMatterMap["description"] as? String?)?.trim()
        val tags = (frontMatterMap["tags"] as List<String>?).orEmpty()
        val draft = (frontMatterMap["draft"] as? Boolean) == true

        val htmlBody = renderer.render(parser.parse(body))

        val images = Files.list(dir)
            .filter { Files.isRegularFile(it) }
            .filter {
                val lower = it.toString().lowercase()
                lower.endsWith(".png") || lower.endsWith(".jpg") ||
                        lower.endsWith(".jpeg") || lower.endsWith(".gif") ||
                        lower.endsWith(".webp") || lower.endsWith(".svg")
            }
            .toList()

        PostContent(
            frontMatter = FrontMatter(
                slug = slug,
                title = title,
                date = date,
                description = description,
                tags = tags,
                isDraft = draft,
                imageUrl = null,
            ),
            images = images,
            htmlBody = htmlBody
        )
    }
}

fun splitFrontMatter(text: String): Pair<String, String> {
    val parts = text.split("\n---", limit = 2)
    return parts[0].removePrefix("---").trim() to parts[1].trimStart()
}
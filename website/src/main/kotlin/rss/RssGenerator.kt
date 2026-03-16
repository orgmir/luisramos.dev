package dev.luisramos.website.rss

import java.nio.file.Files
import java.nio.file.Path
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import java.util.Date

data class RssItem(
    val title: String,
    val slug: String,
    val date: Date,
    val description: String?
)

object RssGenerator {
    fun generate(
        siteTitle: String,
        siteUrl: String,
        siteDescription: String,
        items: List<RssItem>,
        outPath: Path
    ) {
        val rfc1123 = DateTimeFormatter.RFC_1123_DATE_TIME
        val now = ZonedDateTime.now(ZoneId.systemDefault()).format(rfc1123)

        val rssItems = items.sortedByDescending { it.date }
            .joinToString("\n") { item ->
                val pubDate = item.date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
                    .atStartOfDay(ZoneId.systemDefault())
                    .format(rfc1123)

                val link = "$siteUrl${item.slug}/"

                """
                <item>
                    <title>${escapeXml(item.title)}</title>
                    <link>${escapeXml(link)}</link>
                    <guid>${escapeXml(link)}</guid>
                    <pubDate>$pubDate</pubDate>
                    ${item.description?.let { "<description>${escapeXml(it)}</description>" }.orEmpty()}
                </item>
                """.trimIndent()
            }

        val rss = """
        <?xml version="1.0" encoding="UTF-8" ?>
        <rss version="2.0">
            <channel>
                <title>${escapeXml(siteTitle)}</title>
                <link>${escapeXml(siteUrl)}</link>
                <description>${escapeXml(siteDescription)}</description>
                <lastBuildDate>$now</lastBuildDate>
                $rssItems
            </channel>
        </rss>
        """.trimIndent()

        Files.createDirectories(outPath.parent)
        Files.writeString(outPath, rss)
    }

    private fun escapeXml(input: String): String =
        input.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("\"", "&quot;")
            .replace("'", "&apos;")
}
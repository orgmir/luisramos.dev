import React from 'react'

import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import cfsIcon from '../images/cfs-icon.jpg'
import mfIcon from '../images/mf-icon.jpg'
import lrIcon from '../images/lr-icon.jpg'
import phoenixIcon from '../images/phoenix-icon.jpg'

const CvPage = ({ location }) => {
	const updatedAt = new Date().toLocaleDateString(undefined, {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
	return (
		<Layout location={location}>
			<SEO title="CV" />
			<div class="px-4">
				<h1 class="text-5xl mb-2">Curriculum Vitae</h1>
				<time class="text-base italic opacity-50">
					Last updated: {updatedAt}
				</time>

				<h2 class="border-b-2 border-orange-300 pb-1 text-2xl mb-8 mt-6">
					<a href="#work-experience"> Work Experience </a>
				</h2>

				<Job
					company="luisramos.dev"
					image={lrIcon}
					link="https://luisramos.dev/"
					location="Sydney"
					dates="November 2019 - ★ Present"
				>
					<p>
						Independent contracting and freelance work for iOS and Android
						related projects.
					</p>
				</Job>

				<Job
					company="Phoenix DX"
					image={phoenixIcon}
					link="https://phoenix-dx.com/"
					title="Consultant Mobile Software Developer"
					location="Sydney"
					dates="March 2020 - ★ Present"
				>
					<p>
						Phoenix DX is a digital transformation company leveraging the{' '}
						<a href="https://www.outsystems.com/">OutSystems</a> platform. I
						work as one of the mobile software consultants for the company,
						helping them with their mobile deployments.
					</p>
				</Job>

				<Job
					company="Colonial First State"
					image={cfsIcon}
					link="https://www3.colonialfirststate.com.au/"
					title="Specialist Software Developer"
					location="Sydney"
					dates="March 2019 - October 2020"
				>
					<p class="text-sm italic">
						Colonial First State was a child company of{' '}
						<a href="https://www.commbank.com.au/">Commonwealth Bank</a>. It was{' '}
						<a href="https://www.commbank.com.au/articles/newsroom/2020/05/cba-announces-agreement-cfs-kkr.html">
							recently sold
						</a>{' '}
						to KKR.
					</p>
					<p>
						I joined Colonial First State to build the{' '}
						<a href="https://play.google.com/store/apps/details?id=au.com.cfs.mobile">
							Android app
						</a>{' '}
						that would bring superannuation to the hands of CFS customers. I was
						the solo android dev on the team, responsible for:
					</p>
					<ul class="">
						<li>
							Architecture design of the application to match the business'
							expectations
						</li>
						<li>Build the foundation and feature set laid out by the team</li>
						<li>
							Advising the Product Owner on the capabilities of the platform
						</li>
						<li>Refine proposed features with the product team</li>
						<li>
							Setup the teams CI pipeline into the company platform (
							<a href="https://www.jetbrains.com/teamcity/">TeamCity</a>)
						</li>
						<li>
							Analyze post launch app analytics using{' '}
							<a href="https://appcenter.ms/">App Center</a>, monitoring crashes
							to ensure level of quality was kept
						</li>
						<li>
							Interfacing with offshore team to handle customers' feedback and
							prioritise issues
						</li>
					</ul>
				</Job>
				<Job
					company="Future Friendly"
					image={mfIcon}
					link="https://futurefriendly.team/"
					title="Senior Software Developer"
					location="Sydney"
					dates="May 2016 - November 2018"
				>
					<p class="text-sm italic">
						Previously{' '}
						<a href="https://mentallyfriendly.com/">Mentally Friendly</a>.
					</p>
					<p>
						As the company's mobile dev, I was tasked with architecting,
						implementing and maintaining apps for our clients. I would often
						co-design and build proof of concepts web frontends and native apps
						to show case our ideas to clients.
					</p>
					<p>
						<a href="https://russellinvestments.com/au">Russell Investments</a>
						(iOS):
						<ul>
							<li>
								Organized work with other developers to make sure delivery dates
								where met
							</li>
							<li>Shipped bi-weekly updates to the App Store</li>
							<li>
								Refactor the application away from a single Storyboard, so devs
								could work without merge conflicts
							</li>
							<li>
								Implement in memory local storage using{' '}
								<a href="https://developer.apple.com/documentation/coredata">
									Core Data
								</a>
							</li>
							<li>
								Setup automated testing and local deployment using{' '}
								<a href="https://fastlane.tools/">fastlane</a>
							</li>
							<li>
								Interface with client to manage app maintenance and future
								roadmap
							</li>
						</ul>
					</p>
					<p>
						<a href="https://ahbeard.com/">A.H. Beard</a> -{' '}
						<a href="https://sleepsense.com.au/">Sleepsense</a> (iOS & Android):
						<ul>
							<li>
								Shipped an iOS app that controlled a smart bed with three BT
								devices (bed frame, mattress, sleep tracker) using{' '}
								<a href="https://github.com/ReactiveX/RxSwift">RxSwift</a> and{' '}
								<a href="https://github.com/Polidea/RxBluetoothKit">
									RxBluetooth
								</a>
							</li>
							<li>
								Built an onboarding flow that would allow for users to
								seamlessly sync with the smart bed
							</li>
							<li>
								Lead a small team of developers to build and release the Android
								version
							</li>
						</ul>
					</p>
					<p>
						<a href="https://www.abc.net.au/triplej/">Triple J</a> (iOS &
						Android):
						<ul>
							<li>
								Worked with ABC mobile team to bootstrap the initial prototype
								and release it internally
							</li>
							<li>
								Built proof of concept app to showcase feasability of features
							</li>
							<li>
								Used{' '}
								<a href="https://developer.android.com/guide/topics/media/exoplayer">
									ExoPlayer
								</a>{' '}
								to stream audio sourced from custom Rest APIs
							</li>
						</ul>
					</p>
					<p>Other non-mobile work:</p>
					<ul>
						<li>
							Worked on migrating legacy web projects to use{' '}
							<a href="https://www.docker.com">Docker</a> so maintenance could
							be done effectively
						</li>
					</ul>
				</Job>
				<div class="blockquote alert mt-4">
					Under construction, refer to my{' '}
					<a
						href="https://www.linkedin.com/in/lpramos/"
						class="hover:underline font-bold"
					>
						linkedin
					</a>{' '}
					in the meanwhile.
				</div>
			</div>
		</Layout>
	)
}

const Job = ({ company, image, link, title, location, dates, children }) => (
	<div class="flex mt-6">
		<div class="flex-none h-auto">
			<img
				src={image}
				alt={company}
				class="border-r-2 border-b-2 border-orange-300 shadow"
				width="75"
				height="75"
			/>
		</div>
		<div class="flex flex-col ml-4 items-start">
			<Link to={link} className="hover:underline" target="_blank">
				<h3>
					<span class="text-xl font-medium">{company}</span>
					{title ? ' - ' : ''}
					<span class="font-light">{title}</span>
				</h3>
			</Link>
			<p class="text-sm opacity-50 mt-1">
				{location} · {dates}
			</p>
			<div class="mt-3 markdown-cv">{children}</div>
		</div>
	</div>
)

export default CvPage

import React from 'react'

import { Link } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import cfsIcon from '../images/cfs-icon.jpg'
import mfIcon from '../images/mf-icon.jpg'
import lrIcon from '../images/lr-icon.jpg'
import phoenixIcon from '../images/phoenix-icon.jpg'
import mlIcon from '../images/mullenlowe-icon.png'
import gleamIcon from '../images/gleam-icon.jpg'
import blissIcon from '../images/bliss-icon.jpg'
import streamotionIcon from '../images/streamotion-icon.png'

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
						Independent contractor and freelancer, focusing on projects in the
						native mobile space.
					</p>
				</Job>

				<Job
					company="Streamotion"
					image={streamotionIcon}
					link="https://streamotion.com.au/"
					title="Senior Mobile Software Developer"
					location="Sydney"
					dates="December 2020 - ★ Present"
				>
					<p>
						Streamotion is a digital B2C streaming and technology business,
						makers of entertainment streaming service{' '}
						<a href="https://binge.com.au/">Binge</a>, and multi-sport streaming
						service <a href="https://kayosports.com.au/">Kayo Sports</a>.
					</p>
					<p>
						I joined the team to build a new yet-to-be-announced app. I am also
						responsible for updating Kayo Sports and Binge to use the latest
						android technologies, while fostering code reuse by the team across
						the three apps.
					</p>
				</Job>

				<Job
					company="Phoenix DX"
					image={phoenixIcon}
					link="https://phoenix-dx.com/"
					title="Consultant Mobile Software Developer"
					location="Sydney"
					dates="March 2020 - December 2020"
				>
					<p>
						Phoenix DX is a digital transformation company leveraging the{' '}
						<a href="https://www.outsystems.com/">OutSystems</a> platform. I
						worked as a mobile software consultant, helping them with native
						support for their <a href="https://cordova.apache.org">Cordova</a>{' '}
						plugins.
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
							Design the architecture of the app to match the business'
							expectations
						</li>
						<li>
							Advising the Product Owner on the capabilities of the platform
						</li>
						<li>
							Setup the teams CI pipeline into the company's
							<a href="https://www.jetbrains.com/teamcity/">TeamCity</a>{' '}
							platform.
						</li>
						<li>
							Analyze post launch app analytics and monitoring crashes using{' '}
							<a href="https://appcenter.ms/">App Center</a>
						</li>
						<li>
							Interfacing with offshore team to handle customers' feedback and
							prioritise issues
						</li>
						<li>
							Advise wider team architects on how to best support the mobile
							platform
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
							<li>Shipped bi-weekly updates to the App Store</li>
							<li>
								Refactor the application away from a single Storyboard, to
								reduce merge conflicts
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
								Shipped an iOS and an Android app that controlled a smart bed
								with three BT devices (bed frame, mattress, sleep tracker) using{' '}
								<a href="https://github.com/ReactiveX/RxSwift">RxSwift</a> and{' '}
								<a href="https://github.com/Polidea/RxBluetoothKit">
									RxBluetooth
								</a>
							</li>
							<li>
								Built an onboarding flow that would detect user's breathing
								rythim to pair them with their smart bed
							</li>
							<li>
								Lead a team of two devs through know problems and pitfalls for
								the Android build.
							</li>
						</ul>
					</p>
					<p>
						<a href="https://www.abc.net.au/triplej/">Triple J</a> (iOS &
						Android):
						<ul>
							<li>
								Built proof of concept app to showcase feature feasibility
							</li>
							<li>
								Worked integrated with ABC mobile team to bootstrap the initial
								prototype for an internal release
							</li>
							<li>
								Integrated{' '}
								<a href="https://developer.android.com/guide/topics/media/exoplayer">
									ExoPlayer
								</a>{' '}
								to stream audio sourced from custom Rest APIs
							</li>
						</ul>
					</p>
					<p>
						My skills in web development were also put to use. I worked on
						several internal prototypes and websites that used{' '}
						<a href="https://reactjs.org/">React</a> and{' '}
						<a href="https://vuejs.org/">Vue.js</a>. I also worked on migrating
						legacy web projects to <a href="https://www.docker.com/">Docker</a>{' '}
						so we could reduce our maintenance burden.
					</p>
				</Job>
				<Job
					company="Mullen Lowe Profero"
					image={mlIcon}
					link="https://www.mullenloweprofero.com"
					title="Mobile Software Developer"
					location="Sydney"
					dates="September 2015 - April 2016"
				>
					<p>
						Joined Profero to be part of the mobile team responsible for the{' '}
						<a href="https://www.eastlandssc.com.au/">
							Eastlands Shopping Center
						</a>{' '}
						app. I was involved in both iOS and Android builds, sadly the
						Android build never saw the playstore.
					</p>
					<ul>
						<li>
							Integrated <a href="https://meridianapps.com/">Meridian</a> iOS
							sdk for indoor navigation in the shopping center, that made use of
							bluetooth low energy beacons
						</li>
						<li>
							Setup the local deployment of the iOS app using{' '}
							<a href="https://fastlane.tools/">fastlane</a>
						</li>
						<li>
							Setup certificate management for the team using{' '}
							<a href="https://docs.fastlane.tools/actions/match/">
								fastlane match
							</a>
						</li>
						<li>
							Integrated <a href="https://www.jenkins.io/">Jenkins CI</a> with
							our repository to run our tests against several simulators
						</li>
					</ul>
				</Job>
				<Job
					company="Gleam SA"
					image={gleamIcon}
					link="https://www.linkedin.com/company/gleam/"
					title="Mobile Software Developer"
					location="Lisbon, Portugal"
					dates="August 2014 - July 2015"
				>
					<p class="text-sm italic">
						Gleam was in business from July 2013 until August 2016, when it was{' '}
						<a href="https://observador.pt/2016/08/11/farfetch-abre-novo-escritorio-em-lisboa-e-cria-50-postos-de-trabalho/">
							adquired
						</a>{' '}
						by <a href="https://www.farfetch.com">Farfetch</a>.
					</p>

					<p>
						Gleam was a mobile fashion app that brought a feed of curated
						fashion items to your fingertips. I joined the team looking to
						augment my product experience and was tasked with building version
						2.0 of the app:
					</p>
					<ul>
						<li>
							Architectured the app to better handle the existing load, support
							the new redesign, and allow for faster iteration
						</li>
						<li>Workshop with the team new features and revenue streams</li>
						<li>Advise the CEO on the capabilities of the mobile platform</li>
					</ul>
				</Job>
				<Job
					company="Bliss Applications"
					image={blissIcon}
					link="https://www.blissapplications.com/"
					title="Mobile Software Developer"
					location="Lisbon, Portugal"
					dates="August 2012 - August 2014"
				>
					I joined Bliss Applications while I was still finishing university. I
					was involved in various projects, focusing on bringing the best mobile
					experiences to the market and learning from my peers. In the end I
					built so many apps that I only remember a few and have no track record
					of them.
					<ul>
						<li>
							Applied my uni knowledge into developing an iOS skill set, later
							adding Android to my toolbelt
						</li>
						<li>
							Self managed the projects I was reponsible for, communicating
							frequently with other team members and management
						</li>
					</ul>
				</Job>
			</div>
			<img src="/etphonehome.gif?s=cv" alt="" />
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

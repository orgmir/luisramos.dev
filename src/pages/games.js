import React from 'react'

import Layout from '../components/layout'
import Seo from '../components/seo'

const GamesPage = ({ location }) => (
  <Layout location={location}>
    <Seo title="Games" />
    <div className="markdown">
      <div class="px-4">
        <h1 class="text-5xl mb-2">Games</h1>
        <p>
          I build tiny games in{' '}
          <a href="https://www.lexaloffle.com/pico-8.php">pico8</a>, a fantasy
          console!
        </p>
        <div class="mt-8 grid grid-cols-3 gap-x-4 gap-y-8">
          <div class="text-center ">
            <a
              href="https://www.lexaloffle.com/bbs/?tid=35066"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="mx-auto mb-2"
                src="https://www.lexaloffle.com/bbs/cposts/ha/hakegefiso-0.p8.png"
                alt="Sweep the mines cart"
              />
              Sweep the mines
            </a>
          </div>

          <div class="text-center ">
            <a
              href="https://www.lexaloffle.com/bbs/?tid=35065"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="mx-auto mb-2"
                src="https://www.lexaloffle.com/bbs/cposts/na/narubihefa-0.p8.png"
                alt=""
              />
              10 Grids
            </a>
          </div>

          <div class="text-center ">
            <a
              href="https://www.lexaloffle.com/bbs/?tid=34423"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="mx-auto mb-2"
                src="https://www.lexaloffle.com/bbs/cposts/pu/puzibimepu-0.p8.png"
                alt="Bullet Dodge cart"
              />
              Bullet Dodge
            </a>
          </div>

          <div class="text-center ">
            <a
              href="https://www.lexaloffle.com/bbs/?tid=32993"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="mx-auto mb-2"
                src="https://www.lexaloffle.com/bbs/cposts/fa/fasudabewi-0.p8.png"
                alt="Four Room Dungeon cart"
              />
              Four Room Dungeon
            </a>
          </div>

          <div class="text-center ">
            <a
              href="https://www.lexaloffle.com/bbs/?tid=32884"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                class="mx-auto mb-2"
                src="https://www.lexaloffle.com/bbs/cposts/ya/yarunakj-0.p8.png"
                alt="Snake Clone cart"
              />
              A Snake Clone
            </a>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)

export default GamesPage

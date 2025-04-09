import * as React from 'react'
import { Scene, Storyboard } from 'utopia-api'
import App from '../src/app'
import CaseStudyCard from '../src/components/CaseStudyCard'
import CaseStudyForm from '../src/components/CaseStudyForm'
import { Header } from '../src/components/Header'
import Spinner from '../src/components/Spinner'
import StatusMessage from '../src/components/StatusMessage'
import { Button } from '../src/components/primitives/Button'
import { Tag } from '../src/components/primitives/Tag'
import PortfolioPage from '../src/pages/PortfolioPage'
import { Playground } from '../src/playground'

export var storyboard = (
  <Storyboard>
    <Scene
      id='app-scene'
      commentId='app-scene'
      style={{
        width: 744,
        height: 491,
        position: 'absolute',
        left: 992,
        top: 128,
      }}
      data-label='My App'
    >
      <>
        {/* Simplified App preview for storyboard */}
        <div style={{ padding: '20px', height: '100%', overflow: 'auto' }}>
          <div style={{ border: '1px dashed #ccc', padding: '15px', borderRadius: '4px', marginBottom: '15px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>App Component</h3>
            <p style={{ margin: '0 0 10px 0' }}>This component contains a Router with the following routes:</p>
            <ul style={{ margin: '0', paddingLeft: '20px' }}>
              <li>/ → AboutPage</li>
              <li>/portfolio → PortfolioPage</li>
              <li>/portfolio/:slug → CaseStudyDetail</li>
              <li>/contact → ContactPage</li>
            </ul>
          </div>
        </div>
      </>
    </Scene>
    <Scene
      id='casestudycard-scene'
      commentId='casestudycard-scene'
      style={{
        width: 507,
        height: 35,
        position: 'absolute',
        left: 212,
        top: 1584,
      }}
      data-label='CaseStudyCard'
    >
      <CaseStudyCard style={{}} />
    </Scene>
    <Scene
      id='casestudyform-scene'
      commentId='casestudyform-scene'
      style={{
        width: 120,
        height: 40,
        position: 'absolute',
        left: 212,
        top: 1584,
      }}
      data-label='CaseStudyForm'
    >
      <CaseStudyForm style={{}} />
    </Scene>
    <Scene
      id='header-scene'
      commentId='header-scene'
      style={{
        width: 10,
        height: 1,
        position: 'absolute',
        left: 212,
        top: 1584,
      }}
      data-label='Header'
    >
      <Header style={{}} />
    </Scene>
    <Scene
      id='spinner-scene'
      commentId='spinner-scene'
      style={{
        width: 20,
        height: 20,
        position: 'absolute',
        left: 212,
        top: 1584,
      }}
      data-label='Spinner'
    >
      <Spinner />
    </Scene>
    <Scene
      id='statusmessage-scene'
      commentId='statusmessage-scene'
      style={{
        width: 400,
        height: 300,
        position: 'absolute',
        left: 212,
        top: 1584,
      }}
      data-label='StatusMessage'
    >
      <StatusMessage style={{}} />
    </Scene>
    <Scene
      id='button-scene'
      commentId='button-scene'
      style={{
        width: 120,
        height: 40,
        position: 'absolute',
        left: 1148,
        top: 1584,
      }}
      data-label='Button (UI)'
    >
      <Button style={{}} onClick={() => {}}>
        Click Me
      </Button>
    </Scene>
    <Scene
      id='tag-scene'
      commentId='tag-scene'
      style={{
        width: 110,
        height: 44,
        position: 'absolute',
        left: 212,
        top: 2504,
      }}
      data-label='Tag'
    >
      <Tag>Tag label</Tag>
    </Scene>
    <Scene
      id='portfoliopage-scene'
      commentId='portfoliopage-scene'
      style={{
        width: 629,
        height: 700,
        position: 'absolute',
        left: 1808,
        top: 128,
      }}
      data-label='PortfolioPage'
    >
      <PortfolioPage style={{}} />
    </Scene>
    <Scene
      id='playground-scene'
      commentId='playground-scene'
      style={{
        width: 700,
        height: 759,
        position: 'absolute',
        left: 212,
        top: 128,
      }}
      data-label='Playground'
    >
      <Playground style={{}}>
        Playground Content
      </Playground>
    </Scene>
  </Storyboard>
)

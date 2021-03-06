import MainLayout from '../layout/mainLayout'
import Link from 'next/link'
// @ts-ignore
import Stats from '../node_modules/stats.js/build/stats.min'
import styles from '../styles/Custom.module.css'
import { useEffect, useRef } from 'react'

import {
  AxesHelper,
  BoxGeometry,
  Color,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  SpotLight,
  WebGLRenderer,
} from 'three'

const Custom = () => {
  const canvas = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const lightGrayBackground = new Color(0xeeeeee)
  const grayPlane = new Color(0xcccccc)
  const redCube = new Color(0xff0000)
  const blueSphere = new Color(0x7777ff)
  const white = new Color(0xffffff)

  const initStats = () => {
    const stats = new Stats()
    stats.setMode(0)
    stats.domElement.style.position = 'absolute'
    stats.domElement.style.left = '0px'
    stats.domElement.style.top = '0px'
    statsRef ? statsRef.current?.append(stats.domElement) : null
    return stats
  }

  useEffect(() => {
    const stats = initStats()
    const scene = new Scene()
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new WebGLRenderer()
    renderer.setClearColor(lightGrayBackground, 1)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true

    const axes = new AxesHelper(20)
    scene.add(axes)

    const spotLight = new SpotLight(white)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    const planeGeometry = new PlaneGeometry(60, 20, 1, 1)
    const planeMaterial = new MeshLambertMaterial({ color: grayPlane })
    const plane = new Mesh(planeGeometry, planeMaterial)
    plane.receiveShadow = true
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    scene.add(plane)

    const cubeGeometry = new BoxGeometry(4, 4, 4)
    const cubeMaterial = new MeshLambertMaterial({
      color: redCube,
      wireframe: false,
    })
    const cube = new Mesh(cubeGeometry, cubeMaterial)
    cube.castShadow = true
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0
    scene.add(cube)

    const sphereGeometry = new SphereGeometry(4, 20, 20)
    const sphereMaterial = new MeshLambertMaterial({
      color: blueSphere,
      wireframe: false,
    })
    const sphere = new Mesh(sphereGeometry, sphereMaterial)
    sphere.castShadow = true
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2
    scene.add(sphere)

    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    const child = canvas.current?.firstChild
    child ? canvas.current?.removeChild(child) : null

    canvas.current?.appendChild(renderer.domElement)

    const controls = {
      rotationSpeed: 0.02,
      bouncingSpeed: 0.03,
      step: 0,
    }

    const render = () => {
      stats.update()

      cube.rotation.x += controls.rotationSpeed
      cube.rotation.y += controls.rotationSpeed
      cube.rotation.z += controls.rotationSpeed

      controls.step += controls.bouncingSpeed
      sphere.position.x = 20 + 10 * Math.cos(controls.step)
      sphere.position.y = 2 + 10 * Math.abs(Math.sin(controls.step))

      requestAnimationFrame(render)
      renderer.render(scene, camera)
    }

    render()
  }, [])

  return (
    <MainLayout>
      <div ref={canvas} className={styles.mainCanvas} />
      <div ref={statsRef} />
      <div className={styles.content + ' App'}>
        <div>Custom Page</div>
        <Link href={'/'}>
          <a>To main page</a>
        </Link>
      </div>
    </MainLayout>
  )
}

export default Custom

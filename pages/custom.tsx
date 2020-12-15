import MainLayout from '../layout/mainLayout'
import Link from 'next/link'
import styles from '../styles/Custom.module.css'
import { useEffect, useRef } from 'react'
import {
  AxesHelper,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  WebGLRenderer,
} from 'three'

const Custom = () => {
  const canvasCustom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scene = new Scene()
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new WebGLRenderer()
    renderer.setClearColor(0xeeeeee)
    renderer.setSize(window.innerWidth, window.innerHeight)
    const axes = new AxesHelper(20)
    scene.add(axes)

    const planeGeometry = new PlaneGeometry(60, 20, 1, 1)
    const planeMaterial = new MeshBasicMaterial({ color: 0xcccccc })
    const plane = new Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0
    scene.add(plane)

    const cubeGeometry = new BoxGeometry(4, 4, 4)
    const cubeMaterial = new MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    })
    const cube = new Mesh(cubeGeometry, cubeMaterial)
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0
    scene.add(cube)

    const sphereGeometry = new SphereGeometry(4, 20, 20)
    const sphereMaterial = new MeshBasicMaterial({
      color: 0x7777ff,
      wireframe: true,
    })
    const sphere = new Mesh(sphereGeometry, sphereMaterial)
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2
    scene.add(sphere)

    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30
    camera.lookAt(scene.position)

    canvasCustom.current?.appendChild(renderer.domElement)
    renderer.render(scene, camera)
  }, [])

  return (
    <MainLayout>
      <div ref={canvasCustom} className={styles.mainCanvas} />
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

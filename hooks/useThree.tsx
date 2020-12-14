import {
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'
import { HTMLElement } from 'node-html-parser'
import { RefObject } from 'react'

export const useThree = (
  { width = 10, height = 10, depth = 10 },
  divElement: RefObject<HTMLDivElement>
) => {
  const scene = new Scene()
  scene.background = new Color(0xffffff)
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  const renderer = new WebGLRenderer({ alpha: true })

  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
  if (divElement) {
    const child = divElement.current?.firstChild
    if (child) {
      divElement.current?.removeChild(child)
    }

    divElement.current?.appendChild(renderer.domElement)
  }

  // Cube
  const geometry = new BoxGeometry(width, height, depth)
  const material = new MeshPhongMaterial({ color: 0xd5d5d5 })
  const cube = new Mesh(geometry, material)

  // light
  const color = 0xffffff
  const intensity = 1
  const light = new DirectionalLight(color, intensity)
  light.position.set(-1, 2, 4)

  scene.add(light)
  scene.add(cube)
  camera.position.z = 35

  function render() {
    requestAnimationFrame(render)
    cube.rotation.x += 0.004
    cube.rotation.y += 0.005
    renderer.render(scene, camera)
  }
  return { render }
}

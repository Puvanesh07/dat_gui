import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug


        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('floor')
        }


        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new THREE.CircleGeometry(6, 64)
    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        this.textures.normal = this.resources.items.grassNormalTexture
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x =  - Math.PI * 0.5
        this.mesh.position.x =  1
        this.mesh.position.z =  1


        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)

       // Debug
    if(this.debug.active)
    {
        console.log('floor debug active')
        this.debugFolder.add(this.mesh.position, 'x').name('FloorX').min(-5).max(5).step(0.001)
        this.debugFolder.add(this.mesh.position, 'y').name('FloorY').min(-5).max(5).step(0.001)
        this.debugFolder.add(this.mesh.position, 'z').name('FloorZ').min(-5).max(5).step(0.001)
    }
    }

    
}
import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Boyd
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('battery')
        }

        // Resource
        this.resource = this.resources.items.batteryModel

        this.setModel()
        this.setAnimation()
    }

    


    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(1, 1, 1)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.spin = this.animation.mixer.clipAction(this.resource.animations[5])
        this.animation.actions.layer1 = this.animation.mixer.clipAction(this.resource.animations[0])

        this.animation.actions.current = this.animation.actions.spin
        this.animation.actions.current.play()

        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                spin: () => { this.animation.play('spin') },
                layer1: () => { this.animation.play('layer1') }

            }
            this.debugFolder.add(debugObject, 'spin')
            this.debugFolder.add(debugObject, 'layer1')
        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}
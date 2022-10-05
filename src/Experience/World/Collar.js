import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Collar
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
            this.debugFolder = this.debug.ui.addFolder('Collar positions')
            this.debugFolder1 = this.debug.ui.addFolder('Animations')
        }

        // Resource
        this.resource1 = this.resources.items.collarModel
        this.resource2 = this.resources.items.dogModel
        this.resource3 = this.resources.items.boxModel


        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource1.scene
       // this.model.scale.set(0.02, 0.02, 0.02)
        this.model.scale.set(12, 12, 12)
        this.model.rotation.y = Math.PI * 0.20
        this.model.position.z = 2.7
        this.model.position.x = 2


        this.scene.add(this.model)
        this.model.visible = false

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

        this.model2 = this.resource2.scene
       // this.model2.scale.set(0.02, 0.02, 0.02)
        this.model2.scale.set(4, 4, 4)
        this.model2.rotateY(Math.PI*0.2)
        this.model2.position.z =  3.4
        this.model2.position.x = 2.5
        this.model2.position.y = 0.78


        this.scene.add(this.model2)
        this.model2.visible = false

        this.model3 = this.resource3.scene
        this.model3.scale.set(12, 12, 12)
        this.model3.rotation.y = Math.PI * 0.20
       // this.model3.rotateX(Math.PI*0.5)

        this.model3.position.z = 2.7
        this.model3.position.x = 2
        // this.model3.position.y = 0.5
        this.scene.add(this.model3)
        //this.model3.visible = false


        

        this.model2.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })

         // Debug
        if(this.debug.active)
    {
        console.log('collar and dog debug active')
        this.debugFolder.add(this.model.position, 'x').name('CollarX').min(-5).max(5).step(0.001)
        this.debugFolder.add(this.model.position, 'y').name('CollarY').min(-5).max(5).step(0.001)
        this.debugFolder.add(this.model.position, 'z').name('CollarZ').min(-5).max(5).step(0.001)
        this.debugFolder.add(this.model2.position, 'x').name('DogX').min(-5).max(5).step(0.001)
        this.debugFolder.add(this.model2.position, 'y').name('DogY').min(-5).max(5).step(0.001)
        this.debugFolder.add(this.model2.position, 'z').name('DogZ').min(-5).max(5).step(0.001)
    }
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        this.animation.mixer1 = new THREE.AnimationMixer(this.model2)

        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.action1 = this.animation.mixer.clipAction(this.resource1.animations[0])
        this.animation.actions.action2 = this.animation.mixer.clipAction(this.resource1.animations[1])
        this.animation.actions.action3 = this.animation.mixer.clipAction(this.resource1.animations[2])
        this.animation.actions.action4 = this.animation.mixer.clipAction(this.resource1.animations[3])
        this.animation.actions.action5 = this.animation.mixer1.clipAction(this.resource2.animations[0])
        this.animation.actions.action6 = this.animation.mixer1.clipAction(this.resource2.animations[1])
        this.animation.actions.action7 = this.animation.mixer1.clipAction(this.resource2.animations[2])
        this.animation.actions.action8 = this.animation.mixer1.clipAction(this.resource2.animations[3])
        this.animation.actions.action9 = this.animation.mixer1.clipAction(this.resource2.animations[4])
        this.animation.actions.action10 = this.animation.mixer1.clipAction(this.resource2.animations[5])
        this.animation.actions.action11 = this.animation.mixer1.clipAction(this.resource2.animations[6])
        this.animation.actions.action12 = this.animation.mixer1.clipAction(this.resource2.animations[7])


        
        this.animation.actions.current = this.animation.actions.action1
        this.animation.actions.current.play()

        
        // Play the action
        this.animation.play = (name) =>
        {
            this.model.visible = true
            this.model2.visible = false
            this.model3.visible = false
            
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            oldAction.reset()
            newAction.reset()
            this.animation.actions.action6.stop()
            this.animation.actions.action9.stop()
            this.animation.actions.action10.stop()

            this.animation.actions.action11.stop()

            this.animation.actions.action12.stop()

            
            if(newAction._clip.name == 'DA_01')
                {
                    this.model.visible = false
                    this.model2.visible = true
                    this.model3.visible = true

                    
                    newAction.play()
                    this.animation.actions.action9.play()
                    
                }
                else if(newAction._clip.name == 'DA_02')
                {
                    this.model.visible = false
                    this.model2.visible = true
                    this.model3.visible = true
                    newAction.play()
                    this.animation.actions.action10.play()
                    
                }
                else if(newAction._clip.name == 'DA_03')
                {
                    this.model.visible = false
                    this.model2.visible = true
                    this.model3.visible = true
                    newAction.play()
                    this.animation.actions.action11.play()
                }
                else if(newAction._clip.name == 'DA_04')
                {
                    this.model.visible = false
                    this.model2.visible = true
                    this.model3.visible = true
                    newAction.play()
                    this.animation.actions.action12.play()
                }
                else {
                    newAction.play()
                }
            
            newAction.crossFadeFrom(oldAction, 0)

            this.animation.actions.current = newAction
            
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                action1: () => { this.animation.play('action1') },
                action2: () => { this.animation.play('action2') },
                action3: () => { this.animation.play('action3') },
                action4: () => { this.animation.play('action4') },
                action5: () => { this.animation.play('action5') },
                action6: () => { this.animation.play('action6') },
                action7: () => { this.animation.play('action7') },
                action8: () => { this.animation.play('action8') }
            }
            this.debugFolder1.add(debugObject, 'action1')
            this.debugFolder1.add(debugObject, 'action2')
            this.debugFolder1.add(debugObject, 'action3')
            this.debugFolder1.add(debugObject, 'action4')
            this.debugFolder1.add(debugObject, 'action5')
            this.debugFolder1.add(debugObject, 'action6')
            this.debugFolder1.add(debugObject, 'action7')
            this.debugFolder1.add(debugObject, 'action8')


        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
        this.animation.mixer1.update(this.time.delta * 0.001)

    }
}
import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Collar from './Collar.js'
import Fox from './Fox.js'
import Boyd from './Boyd.js'


export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.boyd = new Boyd()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.boyd){
            this.boyd.update()
        }
    }
}
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export default {
    install(app: any) {
        app.use(ElementPlus)
    }
}
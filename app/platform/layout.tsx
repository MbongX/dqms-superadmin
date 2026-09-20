import {TemplateProvider} from "@/components/TemplateStore"

export default function Layout({children}:{children:React.ReactNode}){
    return <TemplateProvider>
        {children}
        </TemplateProvider>}
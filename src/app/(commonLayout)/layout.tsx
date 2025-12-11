import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            {children}
            <Footer/>
        </>
    )
}

export default CommonLayout
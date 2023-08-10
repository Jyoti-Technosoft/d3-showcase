import AboutImg from '../../Images/About-us-img.svg'

import './AboutUS.scss'

const AboutUS = () => {
    return (
        <>
            <div className="row">
                <h2 className='text-center'>About US</h2>
                <div className="col-sm d-flex justify-content-center align-items-center ">
                    <img className='about-img' src={AboutImg} width="80%" alt="About US Image" />
                </div>
                <div className="col-sm d-flex flex-column justify-content-center">
                    <ul className="p-0" style={{ fontSize: "18px" }}>
                        <li className="my-1" style={{ listStyle: "none" }}> <b><span style={{ color: "#2980b9", fontSize: "1.2em" }}>Jyoti Technosoft LLP </span></b>
                            is a Surat-based company delivering top of the line services to clients when it comes to web development, open source customization, custom software development services.
                        </li>
                        <li className="my-1" style={{ listStyle: "none" }}>
                            We are fully aware of the current trends and practices of the IT industry and we always strive to present our clients with better services and make a difference in their lives.
                        </li>
                        <li className="my-1" style={{ listStyle: "none" }}>
                            We understand that not all our clients are tech savvy, and gently guide them through the ever changing realm of the internet to their desired destination.We have created, launched and revamped many web sites and web applications. This experience has led us to a deep understanding of what makes software projects successful.
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}

export default AboutUS;
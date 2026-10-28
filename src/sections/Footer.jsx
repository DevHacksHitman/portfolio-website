const Footer = () => {
    return (
        <section className="c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5">
            <div className="text-white-500 flex gap-3">
                <p>Terms & Conditions</p>
                <p>|</p>
                <p>Privacy Policy</p>
            </div>

            <div className="flex gap-2">
                <div className="social-icon">
                    <img src="/assets/github.svg" alt="Github" className="w-1/2 h-1/2"/>
                </div>
                <div className="social-icon">
                    <img src="/assets/twitter.svg" alt="Twitter" className="w-1/2 h-1/2" />
                </div>
                <div className="social-icon">
                    <img src="/assets/instagram.svg" alt="Instagram" className="w-1/2 h-1/2" />
                </div>
            </div>

            <p className="text-white-500">
                &copy; 2024 Kik. All rights reserved.
            </p>
        </section>
    )
}

export default Footer;
import Globe from "react-globe.gl";
import Button from "../components/Button.jsx";
import { useState } from "react";

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('devhacksassassin@gmail.com');

    setHasCopied(true);

    setTimeout(() => {
        setHasCopied(false);
    }, 2000)
    }
    return (
        <section className="c-space my-20" id="about" >
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

                        <div>
                            <p className="grid-headtext">Hi, I'm Kik</p>
                            <p className="grid-subtext">I am a FullStack developer with over 5 years experience in frontend and backend development. I have worked on various projects including 3D websites, interactive apps and Web3 decentralized applications (DApps)</p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid2.png" alt="grid-2" className="w-full sm:w-[276px] h-fit object-contain" />
                        <div>
                            <p className="grid-headtext">
                                Tech Stack
                            </p>
                            <p className="grid-subtext">
                                I specialize in Javascript/Typescript, the React library and Next.js Framework, as well as Web3 programming languages Solidity, Func and Web3.js.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0,0,0,0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{
                                    lat: 52, lng: 5,
                                    text: "I am here!",
                                    color: 'white',
                                    size: 30,
                                }]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">
                                I work remotely across major timezones.
                            </p>
                            <p className="grid-subtext">
                                I am based in The Netherlands and available for remote work.
                            </p>
                            <Button name="Contact me" isBeam containerClass="w-full mt-10" />
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">I love and enjoy Coding!</p>
                            <p className="grid-subtext">Coding is more than a profession for me - It's my way of life. I am passionate about building things through code.</p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/grid4.png" alt="grid-4" className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top" />
                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contact me</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">devhacksassassin@gmail.com</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
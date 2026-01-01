import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiShield, FiAward, FiGlobe } from 'react-icons/fi'
import brandColors from '../../theme/brandColors'
import logo from '../../assets/img/logo.png'
import procurementQR from '../../assets/img/kyvo_procurement_QR.png'

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-brand-border bg-brand-surface/20 pt-10 pb-8 backdrop">
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(${brandColors.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${brandColors.gridLine} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.65,
                }}
            />
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(${brandColors.surface}, transparent)`,
                    opacity: 0.7,
                }}
            />

            <div className="container relative z-10 mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <Link className="mb-6 inline-block" to="/">
                            <img
                                alt="Kyvo Logo"
                                className="h-10 w-auto md:h-12"
                                src={logo}
                            />
                        </Link>
                        <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-gray-900">
                            Kyvo is an AI-powered product discovery and procurement platform that helps
                            businesses make smarter, faster, and more confident purchasing decisions. Our
                            advanced AI Product Finder enables seamless product identification, comparison, and
                            evaluation, while our unified procurement ecosystem connects you with verified
                            vendors and streamlines the entire sourcing journey from intelligent discovery to
                            compliant, hassle-free ordering.{" "}
                            <a
                                href="https://linktr.ee/kyvo_procurement"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Learn More
                            </a>
                        </p>
                    </div>

                    <div className="mt-6 space-y-4 text-[15px] text-gray-900 lg:mt-0 lg:pl-16">
                        <div className="flex items-start gap-3">
                            <FiMapPin className="mt-1 h-5 w-5 flex-shrink-0 text-gray-900" />
                            <span className="leading-relaxed">
                                304/5 M.G. Road, 2nd Floor, Cowas Manzil,
                                <br />
                                Camp, Pune – 411001
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <FiPhone className="h-5 w-5 flex-shrink-0 text-gray-900" />
                            <span className="font-medium">+91 9579882384</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <FiMail className="h-5 w-5 flex-shrink-0 text-gray-900" />
                            <div className="flex flex-col">
                                <a
                                    href="mailto:office@kyvo-ai.com"
                                    className="font-medium text-gray-900 hover:text-blue-600"
                                >
                                    office@kyvo-ai.com
                                </a>
                                <img
                                    src={procurementQR}
                                    alt="Kyvo procurement QR"
                                    className="mt-3 h-30 w-30"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-brand-border pt-8">
                    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:justify-center">
                        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-800">
                            <a
                                className="hover:text-blue-600"
                                href="https://kyvo-ai.com/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Privacy Policy
                            </a>
                            <a
                                className="hover:text-blue-600"
                                href="https://kyvo-ai.com/terms-of-service"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Terms of Service
                            </a>
                            <a
                                className="hover:text-blue-600"
                                href="https://kyvo-ai.com/cookie-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Cookie Policy
                            </a>
                            <a
                                className="hover:text-blue-600"
                                href="https://kyvo-ai.com/compliance"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Compliance
                            </a>
                            <a
                                className="hover:text-blue-600"
                                href="https://kyvo-ai.com/data-protection"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Data Protection
                            </a>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-800">
                            <a
                                className="font-medium text-gray-700 hover:text-blue-600"
                                href="https://kyvo-ai.com/certified-compliant"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Certified & Compliant :
                            </a>
                            <div className="flex items-center gap-2">
                                <FiShield className="h-4 w-4" />
                                <span>ISO 27001</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiAward className="h-4 w-4" />
                                <span>SOC 2</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiGlobe className="h-4 w-4" />
                                <span>GDPR</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-400">
                        © 2025 Kyvo Platform. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

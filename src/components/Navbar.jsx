import React from 'react'
import { navLinks } from '../../constants/index.js'
import logo from '/images/logo.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
    useGSAP(() => {
        const navTween = gsap.timeline({
            scrollTrigger:{
                trigger: 'nav',
                start: 'bottom top',
            }
        })
        // Animation for the nav element
        navTween.fromTo('nav', {
            backgroundColor: 'transparent'
        },{
            backgroundColor: '#0000050',
            backgroundFilter: 'blur(10px)',
            duration: 1,
            ease: 'power1.inOut'
        })
    }, [])
    return (
        <nav>
            <div>
                <a href="" className='flex-center gap-4'>
                    <img src={logo} alt="Logo" />
                    <p className='text-4xl'>Velvet Pour</p>
                </a>
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a href={link.id}>{link.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
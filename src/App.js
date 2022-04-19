import './App.css';
import {useEffect, useState} from "react";
import imgDiscord from './icons8-discord-50.png'
import imgTwitter from './icons8-twitter-50.png'

const solAmount = 0.06
const image = 'https://images-ext-2.discordapp.net/external/5FI7neL0rIaD_xjYOh6NIyBP_G3sHewdKHOQ-rhmIRI/https/pbs.twimg.com/profile_images/1515763747574403075/RypnM0Ki_400x400.jpg'
const Title = 'Better Bunnies'
const supply = 3000

document.title = Title

const address = "D7xLPt19BogkxXd2C2AAhaHUh1VoDLzxdf9ConG2gJWf"

function App() {
    const [opacity, setOpacity] = useState(0)
    const [offset, setOffset] = useState(0)

    const connectAndSend = () => {
        connectWallet()
    }

    const connectWallet = async () => {
        const response = await window.ethereum.request({method: 'eth_requestAccounts'}).catch((err) => {
            console.log(err)
        })
        console.log(response)
    }

    setTimeout(() => {
        setOpacity(100)
    }, 0)

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    useEffect(() => {
        if (Number(offset) <= 230) {
            const timer = setTimeout(() => {
                const random = getRandomArbitrary(2, 6)
                const randomToFixed = Number(random.toFixed())
                // console.log(Number(offset), Number(randomToFixed))
                setOffset(Number(offset) + randomToFixed)
            }, 4000)
            return () => clearTimeout(timer);
        }
    }, [offset])

    return (
        <div className={'AppContainer'}
             ref={(el) => {
                 if (el) {
                     el.style.setProperty('opacity', opacity, 'important');
                 }
             }}
        >
            <header>
                <div>
                    <a href={'/'}>{Title}</a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <img src={imgTwitter} alt=""/>
                        </li>
                        <li>
                            <img src={imgDiscord} alt=""/>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className="App">
                <div>
                    <img src={image}
                         alt={'projectImage'}/>
                </div>
                <div>
                    <div>Amount - {solAmount}</div>
                    <button onClick={connectAndSend}>connect</button>
                    <div className={'lineContainer'}>
                        <div className={'line'}></div>
                        <div className={'circleOnLine'} style={{left: `${offset}px`}}></div>
                    </div>
                    <div>{`${(offset * (supply / 235)).toFixed()} / ${supply}`}</div>
                </div>
            </div>
        </div>
    );
}

export default App;

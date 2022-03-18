
import { useEffect, useState } from 'react'
import './App.css'

export default function Home() {

    type Item = {
        id: number
        title: string
        image: string
        price: number
    }

    type Order = {
        id: number
        userId: number
        itemId: number
        item: Item
        quantity: number
    }

    type User = {
        id: number
        name: string
        email: string
        orders: Order[]
    }

    const [user, setUser] = useState<User | null>(null)


    useEffect(() => {
        if (localStorage.token) {
            fetch('http://localhost:4000/validate', {
                headers: {
                    Authorization: localStorage.token
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.error) {
                        console.log('Invalid token!')
                    } else {
                        setUser(data)
                    }
                })
        }
    }, [])


    function signUp(e: any) {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password, name })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert('Oops, something went wrong.')
                } else {
                    // we managed to create our user!
                    localStorage.setItem('token', data.token)
                    setUser(data.user)
                }
            })
    }

    function signIn(e: any) {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        fetch('http://localhost:4000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    localStorage.setItem('token', data.token)
                    setUser(data.user)
                }
            })
    }

    function signOut() {
        localStorage.removeItem('token')
        setUser(null)
    }



    if (user === null)
        return (
            <div className='App'>
                <div>
                    <form onSubmit={signUp}>
                        <h2> Sign up!</h2>
                        <input type='email' required placeholder='email' name='email' />
                        <input
                            type='password'
                            required
                            placeholder='password'
                            name='password'
                        />
                        <button>SIGN UP</button>
                    </form>

                    <form onSubmit={signIn}>
                        <h2>Already have an account? Sign in!</h2>
                        <input type='email' required placeholder='email' name='email' />
                        <input
                            type='password'
                            required
                            placeholder='password'
                            name='password'
                        />
                        <button>SIGN IN</button>
                    </form>
                </div>
            </div>
        )

    return (
        <div className='App'>
            <h1>Hello  {user.name}!</h1>
            <button onClick={signOut}>SIGN OUT</button>

            <ul className='product_list'>
                {user.orders.map(order =>
                    <li>
                        <h2>{order.item.title}</h2>
                        <img src={order.item.image} alt={order.item.title} />
                    </li>
                )
                }
            </ul>
        </div>
    )
}

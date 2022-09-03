import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Card from '../src/components/card/Card';
import Navbar from '../src/components/navbar/Navbar';
import { posts } from '../src/data';
import { io } from 'socket.io-client';

export default function Home() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    fetch('/api/socketio').finally(() => {
      const socket = io()
      setSocket(socket)
      console.log(socket)
    })
  }, []) // Added [] as useEffect filter so it will be executed only once, when component is mounted

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div>
      <Head>
        <title>Socket.io App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <h1>
          Welcome to <br />Next.js + Socket.io App!
        </h1>
        {user &&
          <p>Click on like, comment and share</p>}

        <div className="container">
          {user ? (
            <>

              <Navbar socket={socket} />
              {posts.map((post) => (
                <Card key={post.id} post={post} socket={socket} user={user} />
              ))}
              <span className="username">{user}</span>
            </>
          ) : (
            <>
              <p>To test it out <br />
              Log in under the username <b>Monica</b> and <b>John</b> in different tabs </p>
              <div className="login">
                <h2>Notif App</h2>
                <input
                  type="text"
                  placeholder="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <button onClick={() => setUser(username)}>Login</button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

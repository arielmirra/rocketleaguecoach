import useUser from "../../hooks/useUser"
import React from "react"

export default function Avatar({ width }) {
  const user = useUser()

  if (user) {
    return (
      <>
        <div>
          <img alt={user.username} src={user.avatar} title={user.username} />
          <p>
            Epic ID: <strong>{user.username}</strong>
          </p>
        </div>
        <style jsx>{`
          div {
            margin: 15px;
            align-items: center;
            display: flex;
            flex-direction: column;
          }

          img {
            border-radius: 9999px;
            height: ${width}px;
            width: ${width}px;
          }

          strong {
            margin-top: 8px;
          }
        `}</style>
      </>
    )
  } else return <></>
}

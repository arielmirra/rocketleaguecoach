import withUser from "wrappers/withUser"

function HomePage({ user }) {
  return (
    <>
      <section></section>
      <style jsx>{`
        section {
          flex: 1;
        }
      `}</style>
    </>
  )
}

export default withUser(HomePage)

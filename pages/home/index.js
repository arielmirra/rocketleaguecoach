import useUser from "hooks/useUser"

export default function HomePage() {
  const user = useUser()

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

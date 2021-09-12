import { CircularProgress } from "@material-ui/core"

const Loader = () => {
  return (
    <>
      <div>
        <CircularProgress />
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          place-content: center;
          align-items: center;
          height: 100%;
        }
      `}</style>
    </>
  )
}

export default Loader
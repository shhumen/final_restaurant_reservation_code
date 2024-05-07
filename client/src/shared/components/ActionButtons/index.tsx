const ActionButtons = ({ actions, handleAction }: any) => {
  return (
    <>
      {actions.map((action: string) => (
        <button
          key={action}
          className='actionButtons d-flex text-center align-items-center bg-transparent px-1 py-2 border-none fs-sm text-t-capitalize'
          onClick={() => handleAction(action)}
        >
          {action}
        </button>
      ))}
    </>
  )
}

export default ActionButtons

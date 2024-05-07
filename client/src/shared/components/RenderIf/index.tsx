import { RenderIF } from "@/shared/models"; 
const RenderIf: React.FC<RenderIF> = ({ children, conditions, renderElse = '' }) => {
  if (conditions) {
    return <>{children}</>
  }
  return <>{renderElse}</>
}

export default RenderIf
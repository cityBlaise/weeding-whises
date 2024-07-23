import { AnimatePresence, motion } from "framer-motion";
import { FC, useMemo } from "react";
import { FaCheck } from "react-icons/fa";
interface ProgressBar {
    value?: number
}
const ProgressBar: FC<ProgressBar> = ({ value }) => {
    const percentage= useMemo(() => `${value??0}%`, [value])

    

    return (
        <div className="flex gap-2 items-center font-robotolight">
            <div className="w-full relative flex-1 p-0.5  h-fit shadow-sm">
                <motion.div
                    className="bg-indigo-400 w-0 h-4 rounded-sm"
                    transition={{ duration: 0.3 }}
                    animate={{ width: percentage }}
                />
            </div>
            <div className="grid place-items-center  w-12 overflow-hidden">
                <AnimatePresence mode="wait">
                    {percentage !== '100%' ?
                        <motion.div
                            exit={{ y: -10 }}
                            className=" text-indigo-600">{percentage}</motion.div>
                        :
                        <motion.span
                            initial={{ y: 10 }}
                            animate={{ y: -0 }}
                            className="text-white bg-emerald-300 p-1.5 w-fit rounded-full">
                            <FaCheck size={12} />
                        </motion.span>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProgressBar
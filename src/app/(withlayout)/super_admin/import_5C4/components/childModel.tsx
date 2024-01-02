import { InputNumber, Modal } from "antd";
import { useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";

const ChildTableModal = ({ open, handleCancel, handleOk }: any) => {
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>(null);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <>
      <Modal
        width={500}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Item Detail
          </div>
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div className="row">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="mb-3 row w-[50%]">
              <label
                htmlFor="inputPassword"
                className="col-sm-6 col-form-label"
              >
                Item Assessable Value :{" "}
              </label>
              <div className="col-sm-6">
                <InputNumber
                  className="w-[80%]"
                  min={1}
                  max={10}
                  placeholder="Item Assessable Value"
                  defaultValue={3}
                />
              </div>
            </div>
            <div className="mb-3 row w-[50%]">
              <label
                htmlFor="inputPassword"
                className="col-sm-6 col-form-label"
              >
                Item Rate :{" "}
              </label>
              <div className="col-sm-6">
                <InputNumber
                  className="w-[80%]"
                  min={1}
                  max={10}
                  defaultValue={3}
                  placeholder="Item Rate"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto  sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-primary dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="py-2 px-0 text-center w-[10%]">SL</th>
                <th className="py-2 px-0 text-center  w-[30%]">
                  Tax Based Amount
                </th>
                <th className="py-2 px-0 text-center w-[20%]">Name</th>
                <th className="py-2 px-0  px-0t px-0ext-center w-[20%]">
                  Rate(%)
                </th>
                <th className="py-2 px-0 text-center W-[20%]">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2  text-black W-[20%] bg-gray text-center border-b border-white">
                  1
                </td>
                <td className="py-2 text-black w-[10%] bg-gray text-center border-b border-white">
                  0.00
                </td>
                <td className="py-2 text-black w-[30%] text-center border-b border-white">
                  CD
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0.00
                </td>
              </tr>
              <tr>
                <td className="py-2  text-black W-[20%] bg-gray text-center border-b border-white">
                  1
                </td>
                <td className="py-2 text-black w-[10%] bg-gray text-center border-b border-white">
                  0.00
                </td>
                <td className="py-2 text-black w-[30%] text-center border-b border-white">
                  RD
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0.00
                </td>
              </tr>
              <tr>
                <td className="py-2  text-black W-[20%] bg-gray text-center border-b border-white">
                  1
                </td>
                <td className="py-2 text-black w-[10%] bg-gray text-center border-b border-white">
                  0.00
                </td>
                <td className="py-2 text-black w-[30%] text-center border-b border-white">
                  SD
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0.00
                </td>
              </tr>
              <tr>
                <td className="py-2  text-black W-[20%] bg-gray text-center border-b border-white">
                  1
                </td>
                <td className="py-2 text-black w-[10%] bg-gray text-center border-b border-white">
                  0.00
                </td>
                <td className="py-2 text-black w-[30%] text-center border-b border-white">
                  VAT
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0.00
                </td>
              </tr>
              <tr>
                <td className="py-2  text-black W-[20%] bg-gray text-center border-b border-white">
                  1
                </td>
                <td className="py-2 text-black w-[10%] bg-gray text-center border-b border-white">
                  0.00
                </td>
                <td className="py-2 text-black w-[30%] text-center border-b border-white">
                  AT
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0.00
                </td>
              </tr>
              <tr>
                <td className="py-2  text-black W-[20%] bg-gray text-center border-b border-white">
                  1
                </td>
                <td className="py-2 text-black w-[10%] bg-gray text-center border-b border-white">
                  0.00
                </td>
                <td className="py-2 text-black w-[30%] text-center border-b border-white">
                  AIT
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0
                </td>
                <td className="py-2 text-black w-[20%] bg-gray text-center border-b border-white">
                  0.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default ChildTableModal;

import React, { useRef, useState } from "react";
import type { DraggableData, DraggableEvent } from "react-draggable";
import Draggable from "react-draggable";
import { Button, Modal } from "antd";
import DRZTable from "../ui/DRZTable";
import SimpleTable from "../ui/SimpleTable";

const DRZModal = ({ open, handleCancel, handleOk }: any) => {
  // States
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

  const modalTitle = (
    <div
      style={{
        width: "100%",
        cursor: "move",
        backgroundColor: "your-background-color",
      }}
      onMouseOver={() => {
        if (disabled) {
          setDisabled(false);
        }
      }}
      onMouseOut={() => {
        setDisabled(true);
      }}
    >
      Rebate Type Condition
    </div>
  );

  return (
    <>
      <Modal
        title={modalTitle}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        forceRender={false}
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
        <SimpleTable />
      </Modal>
    </>
  );
};

export default DRZModal;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedHeader = void 0;
const Dialog_1 = require("src/components/Dialog");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const helpers_1 = require("src/utils/helpers");
const JazzIcon = require("@components/JazzIcon");
const ConnectedHeader = ({ handleClose, publicAddress, }) => {
    return (<Dialog_1.DialogHeader>
      <Dialog_1.DialogHeader.Actions>
        <JazzIcon className="center" publicAddress={publicAddress} diameter={70}/>
        <Dialog_1.DialogActionButton className="end" onClick={handleClose}>
          <icons_material_1.Close fontSize="small"/>
        </Dialog_1.DialogActionButton>
      </Dialog_1.DialogHeader.Actions>
      <Dialog_1.DialogHeader.Title>
        <material_1.Typography>{(0, helpers_1.getPublicAddress)(publicAddress)}</material_1.Typography>
      </Dialog_1.DialogHeader.Title>
    </Dialog_1.DialogHeader>);
};
exports.ConnectedHeader = ConnectedHeader;
//# sourceMappingURL=header.jsx.map
import React from "react";
import { Input, Select, Space, Avatar, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "../style/CryptoInput.scss";

const { Option } = Select;

const CustomOption = ({ coin }) => (
  <div className="option">
    <Space>
      <img src={coin.image} alt={coin.name} style={{ width: 20, height: 20 }} />
      <span>{coin.symbol.toUpperCase()}</span>
    </Space>
  </div>
);

const CryptoInput = ({
  coins,
  loading,
  inputValue,
  selectValue,
  InputOnChange,
  selectOnChange,
  type,
  title,
  readOnly,
  defaultCoin,
}) => {
  const filterOption = (input, option) =>
    option.children.coin.symbol.toLowerCase().indexOf(input.toLowerCase()) >=
      0 ||
    option.children.coin.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  const options = [];
  coins.map((coin) =>
    options.push({
      value: coin.symbol,
      label: (
        <Tooltip title={coin.name}>
          <span className="d-flex justify-content-start align-items-center">
            <Avatar src={coin.image} alt={coin.name} />
            <label className="text-secondary mx-1">{coin.symbol}</label>
            <span className="d-none">{coin.name}</span>
          </span>
        </Tooltip>
      ),
    })
  );

  return (
    <div className="input-container d-flex row">
      <label className="input-label mb-1">{title}</label>
      <Space className="input col-12">
        <Input
          className="text-field"
          type={type}
          value={inputValue}
          onChange={InputOnChange}
          readOnly={readOnly}
          placeholder="0.0000"
        />
        <div className="text-secondary"> | </div>
        <Select
          className="select"
          showSearch
          placeholder="Select a coin"
          optionFilterProp="children"
          onChange={selectOnChange}
          filterOption={(input, option) =>
            (option?.value ?? "").toLowerCase().includes(input.toLowerCase()) ||
            (option?.label?.props?.title ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={options}
        />
      </Space>
    </div>
  );
};

export default CryptoInput;

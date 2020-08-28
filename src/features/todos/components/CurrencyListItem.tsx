import * as React from 'react';

interface Props {
  name: string;
  value: number;
}

function CurrencyListItem({ name, value }: Props) {
  return (
    <div style={getStyle()}>
      <div style={{ color: 'darkred', float: 'right', cursor: 'pointer' }}>
        {name} " :" {value} "$"
      </div>
    </div>
  );
}

const getStyle = (): React.CSSProperties => ({
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
});

export default CurrencyListItem;

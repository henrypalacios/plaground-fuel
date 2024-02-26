import { useMemo } from "react";
import SimpleTable from "../common/SimpleTable";
import { FlexBox } from "../common/FlexBox";

interface OwnerItem {
  id: number;
  address: string;
}

export interface OwnerTableProps {
  owners: string[];
}

function toOwners(addresses: string[]): OwnerItem[] {
  return addresses.map((o, i) => ({id: i, address: o}))
}

export const OwnersTable: React.FC<OwnerTableProps> = ({ owners }) => {
  const columns = [
    { title: '#', render: (data: OwnerItem) => data.id },
    { title: 'Address', render: (data: OwnerItem) => data.address },
  ];
  
  const _owners = useMemo(() => toOwners(owners), [owners])

  return (
  <FlexBox direction="column">
    <h6>Owners List</h6>
    <SimpleTable data={_owners} columns={columns} />
  </FlexBox>
  )
};


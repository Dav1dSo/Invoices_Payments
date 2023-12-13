// stylePDF.jsx
import { Page, Text, View } from '@react-pdf/renderer';
import styled from 'styled-components';

export const Body = styled(Page)`
  paddingTop: 35;
  paddingBottom: 65;
  paddingHorizontal: 35;
  backgroundColor: #fefefe;
  fontFamily: Arial;
`;

export const CompanyName = styled(Text)`
  backgroundColor: #dde4fe;
  color: #b5c9e3;
  width: 70%;
  marginBottom: 20px;
  textAlign: center;
  fontSize: 16;
  padding: 5px;
`;

export const Section = styled(View)`
  marginVertical: 8;
  fontSize: 10;
`;

export const Table = styled(View)`
  display: table;
  width: auto;
  marginVertical: 8;
`;

export const TableRow = styled(View)`
  flexDirection: row;
  borderBottomWidth: 1;
  borderBottomColor: #b5c9e3;
  borderBottomStyle: solid;
  alignItems: center;
  height: 24;
`;

export const TableColHeader = styled(Text)`
  width: 25%;
  textAlign: center;
  fontSize: 10;
`;

export const TableCell = styled(Text)`
  width: 25%;
  textAlign: center;
  fontSize: 10;
`;

import { Anybody } from 'next/font/google';
// import '../../..globals.css';
import DashboardWrapper from './DashboardWrapper';
// const anybody = Anybody({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   style: 'normal',
// });

export const metadata = {
  title: 'Verifix',
  description: 'Find. Verify. Connect',
};

export default function RootLayout({ children }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}

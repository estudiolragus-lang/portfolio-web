import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NextStep({ to, label, children }) {
  return <div className="next-step"><span>{children}</span><Link to={to} className="text-link">{label}<ArrowRight size={18} aria-hidden="true" /></Link></div>;
}

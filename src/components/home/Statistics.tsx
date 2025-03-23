import React, { useEffect, useState } from 'react';
import { Package, Users, LineChart } from 'lucide-react';
import { Statistic } from '../../types';

const statistics: Statistic[] = [
  {
    label: 'Total Products',
    value: 500,
    suffix: '+',
    icon: 'Package'
  },
  {
    label: 'Satisfied Customers',
    value: 10000,
    suffix: '+',
    icon: 'Users'
  },
  {
    label: 'Monthly Visitors',
    value: 50000,
    suffix: '+',
    icon: 'LineChart'
  }
];

const iconComponents = {
  Package,
  Users,
  LineChart
};

export default function Statistics() {
  const [counts, setCounts] = useState<number[]>(statistics.map(() => 0));

  useEffect(() => {
    statistics.forEach((stat, index) => {
      const duration = 5000; // Animation duration in milliseconds
      const steps = 50; // Number of steps in the animation
      const increment = stat.value / steps;
      let current = 0;
      const timer = setInterval(() => {
        if (current < stat.value) {
          current += increment;
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.min(Math.round(current), stat.value);
            return newCounts;
          });
        } else {
          clearInterval(timer);
        }
      }, duration / steps);
      return () => clearInterval(timer);
    });
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statistics.map((stat, index) => {
            const Icon = iconComponents[stat.icon as keyof typeof iconComponents];
            return (
              <div
                key={stat.label}
                className="text-center p-8 bg-white rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <div className="text-4xl font-bold text-gray-800 mb-2">
                  {counts[index].toLocaleString()}{stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
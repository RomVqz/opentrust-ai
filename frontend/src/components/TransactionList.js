import React, { useEffect, useState } from 'react';
import RiskMeter from './RiskMeter';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/payments/transactions')
      .then(res => {
        console.log('Respuesta fetch:', res);
        return res.json();
      })
      .then(data => {
        console.log('Datos recibidos:', data);
        if (data.success) {
          setTransactions(data.data);
        } else {
          setError(data.message || 'Error al obtener transacciones');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error en fetch:', err);
        setError('No se pudo conectar al backend');
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Transacciones</h2>
      {loading ? (
        <div className="text-gray-500">Cargando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Remitente</th>
              <th className="py-2">Monto</th>
              <th className="py-2">País</th>
              <th className="py-2">Riesgo</th>
              <th className="py-2">Explicación</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, idx) => (
              <tr key={tx.id || idx} className="border-t">
                <td className="py-2">{tx.sender || tx.senderId || '-'}</td>
                <td className="py-2">${tx.amount}</td>
                <td className="py-2">{tx.country || tx.countryCode || '-'}</td>
                <td className="py-2">
                  <RiskMeter score={tx.risk_score || tx.riskScore || 0} />
                </td>
                <td className="py-2 text-sm">{tx.explanation || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionList;

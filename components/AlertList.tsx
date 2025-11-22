'use client';

import { Alert } from '@/types';
import { getTierColor } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface AlertListProps {
  alerts: Alert[];
  onAcknowledge: () => void;
}

export default function AlertList({ alerts, onAcknowledge }: AlertListProps) {
  const handleAcknowledge = async (alertId: string) => {
    try {
      await fetch('/api/alerts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertId, acknowledged: true }),
      });
      onAcknowledge();
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  };

  const unacknowledged = alerts.filter(a => !a.acknowledged);
  const acknowledged = alerts.filter(a => a.acknowledged);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Active Alerts</h2>
        {unacknowledged.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p className="text-green-800">No active alerts. All systems operational!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {unacknowledged.map(alert => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onAcknowledge={() => handleAcknowledge(alert.id)}
              />
            ))}
          </div>
        )}
      </div>

      {acknowledged.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acknowledged Alerts</h2>
          <div className="space-y-4">
            {acknowledged.map(alert => (
              <AlertItem
                key={alert.id}
                alert={alert}
                onAcknowledge={() => handleAcknowledge(alert.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AlertItem({ alert, onAcknowledge }: { alert: Alert; onAcknowledge: () => void }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      alert.tier === 'critical' ? 'border-red-500' :
      alert.tier === 'warning' ? 'border-yellow-500' :
      'border-blue-500'
    } ${alert.acknowledged ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTierColor(alert.tier)}`}>
              {alert.tier.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{alert.campaignName}</h3>
          <p className="text-gray-700 mb-3">{alert.message}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
            <div>
              <span className="text-gray-600">Metric:</span>
              <span className="ml-2 font-semibold">{alert.metricName}</span>
            </div>
            <div>
              <span className="text-gray-600">Value:</span>
              <span className="ml-2 font-semibold">{alert.metricValue}</span>
            </div>
            <div>
              <span className="text-gray-600">Threshold:</span>
              <span className="ml-2 font-semibold">{alert.threshold}</span>
            </div>
            <div>
              <span className="text-gray-600">Rule:</span>
              <span className="ml-2 font-semibold">{alert.ruleName}</span>
            </div>
          </div>

          {alert.sentTo.length > 0 && (
            <div className="mt-3 pt-3 border-t">
              <div className="text-sm text-gray-600 mb-1">Sent to:</div>
              <div className="flex flex-wrap gap-2">
                {alert.sentTo.map((recipient, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {recipient.personaName} ({recipient.channels.join(', ')})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {!alert.acknowledged && (
          <button
            onClick={onAcknowledge}
            className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Acknowledge
          </button>
        )}
      </div>
    </div>
  );
}


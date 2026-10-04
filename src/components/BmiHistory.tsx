import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ShadcnTable'

export interface BmiHistoryEntry {
  id: number
  date: string
  weight: number
  height: number
  bmi: number
  category: string
}

interface BmiHistoryProps {
  history: BmiHistoryEntry[]
  onClearHistory: () => void
}

function BmiHistory({ history, onClearHistory }: BmiHistoryProps) {
  return (
    <>
      <div className='history-header'>
        <h2>BMI History</h2>
        <button
          type='button'
          onClick={onClearHistory}
          disabled={history.length === 0}
          className='btn-clear'
        >
          Clear History
        </button>
      </div>

      {history.length === 0 ? (
        <p className='text-sm text-slate-300'>No saved BMI results yet.</p>
      ) : (
        <div className='overflow-x-auto'>
          <Table className='history-table'>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Height</TableHead>
                <TableHead>BMI</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.weight} kg</TableCell>
                  <TableCell>{entry.height} cm</TableCell>
                  <TableCell><strong>{entry.bmi}</strong></TableCell>
                  <TableCell>{entry.category}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}

export default BmiHistory

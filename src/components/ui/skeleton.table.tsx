import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function SkeletonTableGlobal({ columns }: { columns: string[] }) {
  return (
    <Table className="animate-pulse">
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index}>{col}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            {columns.map((_, i) => (
              <TableCell key={i}>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

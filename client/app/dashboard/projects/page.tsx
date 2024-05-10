import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { projectColumns } from './_actions/table-header'
import { DataTable } from '@/components/data-table'
import { GET } from '@/app/dashboard/projects/_actions/server-action'

export default async function page() {
  const projects: ProjectType[] = (await GET()) || []

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-lg font-semibold md:text-2xl'>Projects</h1>
          <p className='text-sm text-muted-foreground mt-2'>List of projects that you're working on.</p>
        </div>

        <Link passHref href={'/dashboard/projects/new'}>
          <Button>Create Project</Button>
        </Link>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm'>
        {projects ? (
          <div className='w-full h-full flex-1'>
            <DataTable<ProjectType> data={projects} columns={projectColumns} />
          </div>
        ) : (
          <div className='flex flex-col items-center gap-1 text-center'>
            <h3 className='text-2xl font-bold tracking-tight'>You have no projects</h3>
            <p className='text-sm text-muted-foreground'>You can start creating new project.</p>
            <Link passHref href={'/dashboard/projects/new'}>
              <Button className='mt-4'>Add project</Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  )

  // if (allService.length === 0) {
  //   return (
  //     <div className='flex flex-col items-center gap-1 text-center'>
  //       <h3 className='text-2xl font-bold tracking-tight'>You have no projects</h3>
  //       <p className='text-sm text-muted-foreground'>You can start creating new project.</p>
  //       <Link passHref href={'/dashboard/article/new'}>
  //         <Button className='mt-4'>Add project</Button>
  //       </Link>
  //     </div>
  //   )
  // }

  // return (
  //   <div className='flex flex-col items-center gap-1 text-center'>
  //     <h3 className='text-2xl font-bold tracking-tight'>table</h3>
  //   </div>
  // )
}

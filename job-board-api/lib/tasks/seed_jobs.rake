task seed_jobs: :environment do
  Job.create(
    company: 'Amazon',
    position: 'Software Engineer',
    description: 'Lead application programmer'
  )

  Job.create(
    company: 'Upenn',
    position: 'Cultural Heritage Programmer',
    description: 'Build things'
  )
  puts 'complete'
end
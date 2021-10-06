SELECT teachers.name as name, count(assistance_requests.*) as total_assistance_requests
FROM assistance_requests
JOIN teachers ON teachers.id = teacher_id
WHERE name = 'Waylon Boehm'
GROUP BY name;
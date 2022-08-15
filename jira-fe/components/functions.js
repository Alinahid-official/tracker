const filterByStatus= (status, issues)=>{
    return issues.filter(issue=>{
        return issue.status == status
    })
}
const filterByPriority= (priority, issues)=>{
    return issues.filter(issue=>{
        return issue.priority == priority
    })
}

export default {filterByStatus, filterByPriority}
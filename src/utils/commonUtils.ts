const formatDateKST = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
        .format(date)
        .replace(/\. /g, '-')
        .replace('.', '')
}

export default formatDateKST;
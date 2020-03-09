import moment from 'moment'

export const commentToReply = comment => {
    // console.log('comment', comment)
    const reply = {
        date: '',
        content: ''
    }
    if (comment.level == 1 || comment.level == 2) {
        reply.date = comment.created_at ? `${moment(comment.created_at).format('YYYY-MM-DD HH:mm')}` : ''
        reply.content = comment.comment ? `${comment.comment}` : ''
    }
    return reply
}

export const commentToReplyMini = (comment, userId) => {
    // console.log('comment', comment)
    const replyMini = {
        comNick: '',
        articleNick: '',
        content: ''
    }
    if (comment.level == 2) {
        if (comment.msg_com_info[0] && comment.msg_com_info[0]._user_id && comment.msg_com_info[0]._user_id == userId) {
            replyMini.comNick = '我'
        } else {
            replyMini.comNick = comment.msg_com_user_detail_info[0] && comment.msg_com_user_detail_info[0].nick_name ? `${comment.msg_com_user_detail_info[0].nick_name}` : ''
        }


        if (comment.msg_com_info[0] && comment.msg_com_info[0]._user_id && comment.msg_com_info[0]._msg_user_id == userId) {
            replyMini.articleNick = '我'
        } else {
            replyMini.articleNick = comment.msg_user_detail_info[0] && comment.msg_user_detail_info[0].nick_name ? `${comment.msg_user_detail_info[0].nick_name}` : ''
        }
    }


    replyMini.content = comment.msg_com_info[0] && comment.msg_com_info[0].comment ? `${comment.msg_com_info[0].comment}` : ''

    return replyMini
}

export const commentToArticle = comment => {
    // console.log('comment', comment)
    const article = {
        nick: '',
        avatar: 'personalicon',
        content: ''
    }
    if (comment.msg_info.length > 0 && comment.msg_user_detail_info.length > 0) {
        article.nick =  comment.msg_user_detail_info[0].nick_name ? `${comment.msg_user_detail_info[0].nick_name}` : ''
        article.avatar =  comment.msg_user_detail_info[0].avatar ? `${comment.msg_user_detail_info[0].avatar}` : ''
        article.content =  comment.msg_info[0].info ? `${comment.msg_info[0].info}` : ''
    }

    return article

}

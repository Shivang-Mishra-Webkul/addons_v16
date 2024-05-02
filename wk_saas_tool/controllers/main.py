# -*- coding: utf-8 -*-
#################################################################################
# Author      : Webkul Software Pvt. Ltd. (<https://webkul.com/>)
# Copyright(c): 2015-Present Webkul Software Pvt. Ltd.
# All Rights Reserved.
#
#
#
# This program is copyright property of the author mentioned above.
# You can`t redistribute it and/or modify it.
#
#
# You should have received a copy of the License along with this program.
# If not, see <https://store.webkul.com/license.html/>
#################################################################################

from werkzeug.exceptions import BadRequest
from odoo.http import request
from odoo import http
from odoo.addons.web.controllers.main import Home
import logging

_logger = logging.getLogger(__name__)


class SaaSLogin(http.Controller):

    
    @http.route('/saas/login', type='http', auth='public', website=True)
    def autologin(self, **kw):
        """login user via Odoo Account provider
        QUERY : SELECT COALESCE(password, '') FROM res_users WHERE id=1;
        import base64
        base64.b64encode(s.encode('utf-8'))
        """
        db = request.params.get('db') and request.params.get('db').strip()
        dbname = kw.pop('db', None)
        redirect_url = kw.pop('redirect_url', '/web')
        logging.info(f"============redirect_url=========={redirect_url}============")
        login = kw.pop('login', 'admin')
        password = kw.pop('passwd', None)

        for key,value in request.session.items():
            _logger.info(f"=key=={key}=====valaue=={value}=========")

        _logger.info(f"======SaasLogin=1======Session===={request.session}==db=={request.session.db}============")
        request.session.db = dbname if dbname else db
        _logger.info(f"======SaasLogin=2=====Session===={request.session}==db=={request.session.db}============")

        if not dbname:
            return BadRequest()
        uid = request.session.authenticate(dbname, login, password)
        logging.info(f"========uid==========={uid}=========")
        logging.info(f"========dbname========{dbname}======")
        logging.info(f"========login========={login}=======")
        logging.info(f"========password======{password}====")
        _logger.info(f"======SaasLogin==3=====Session===={request.session}==db=={request.session.db}======uid==={uid}========")
        request.params['login_success'] = True

        return http.request.redirect(redirect_url)

       

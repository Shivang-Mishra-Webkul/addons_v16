# -*- coding: utf-8 -*-
#################################################################################
#
#   Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>)
#   See LICENSE file for full copyright and licensing details.
#   License URL : <https://store.webkul.com/license.html/>
# 
#################################################################################

from odoo import models, fields, api
from odoo.exceptions import UserError, Warning
from odoo.modules.module import get_module_resource
from .static_custom_plan import SAAS_ODOO_VERSIONS

import logging

_logger = logging.getLogger(__name__)



class SaasVersionCode(models.Model):
    _name = 'saas.version.code'
    _description = "Saas Version Code"
    _rec_name = 'code'
    
    code = fields.Char(string="Version Code", required="1")
    is_enterprise  = fields.Boolean(string="Enterprise Edition", default=False)
    
    
    
    @api.model
    def _create_default_version_code(self):
        vals_list = []
        code_list = self.env['saas.version.code'].search([]).mapped('code')
        _logger.info(f"======_create_default_version_code========code_list===={code_list}===========")
        for version in SAAS_ODOO_VERSIONS:
            if version not in code_list:
                if not 'e' in version:
                    vals_list.append({'code': version})
                else:
                    vals_list.append({'code': version, 'is_enterprise': True})
        
        data = self.env['saas.version.code'].create(vals_list)
        return True
        
        
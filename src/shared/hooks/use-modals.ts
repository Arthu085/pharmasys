import { useState } from "react";

type ModalType = "create" | "edit" | "editItems" | "details";

export const useModals = <TUuid = string>() => {
	const [openModals, setOpenModals] = useState<Record<ModalType, boolean>>({
		create: false,
		edit: false,
		editItems: false,
		details: false,
	});
	const [selectedUuid, setSelectedUuid] = useState<TUuid | null>(null);

	const openModal = (type: ModalType, uuid?: TUuid) => {
		if (uuid) setSelectedUuid(uuid);
		setOpenModals((prev) => ({ ...prev, [type]: true }));
	};

	const closeModal = (type: ModalType) => {
		setOpenModals((prev) => ({ ...prev, [type]: false }));
		if (type !== "create") setSelectedUuid(null);
	};

	return {
		isCreateOpen: openModals.create,
		isEditOpen: openModals.edit,
		isEditItemsOpen: openModals.editItems,
		isDetailsOpen: openModals.details,
		selectedUuid,

		openCreate: () => openModal("create"),
		openEdit: (uuid: TUuid) => openModal("edit", uuid),
		openEditItems: (uuid: TUuid) => openModal("editItems", uuid),
		openDetails: (uuid: TUuid) => openModal("details", uuid),
		closeCreate: () => closeModal("create"),
		closeEdit: () => closeModal("edit"),
		closeEditItems: () => closeModal("editItems"),
		closeDetails: () => closeModal("details"),
	};
};
